/*
  # Setup Automatic Profile Creation for Admin and Moderator

  ## Overview
  This migration sets up an automatic system to assign roles to users based on their email.
  When users sign up with specific emails, they automatically get assigned the correct role.

  ## How It Works
  1. Users sign up through the Supabase Auth system (or via the app)
  2. A trigger automatically creates their profile with the correct role
  3. Special emails get special roles:
     - admin@olympiad.bd → admin role
     - moderator@olympiad.bd → moderator role
     - Any other email → participant role

  ## Admin and Moderator Credentials
  
  **Admin Account:**
  - Email: admin@olympiad.bd
  - Password: Admin@123456
  - Role: admin (auto-assigned)
  
  **Moderator Account:**
  - Email: moderator@olympiad.bd  
  - Password: Moderator@123456
  - Role: moderator (auto-assigned)

  ## Setup Instructions
  
  ### Option 1: Via Supabase Dashboard (Recommended)
  1. Go to Supabase Dashboard > Authentication > Users
  2. Click "Add User" > "Create new user"
  3. Enter email: admin@olympiad.bd
  4. Enter password: Admin@123456
  5. Check "Auto Confirm User"
  6. Click "Create User"
  7. Repeat for moderator@olympiad.bd
  
  ### Option 2: Via Application Signup
  1. Go to the signup page of your app
  2. Sign up with email: admin@olympiad.bd and password: Admin@123456
  3. Sign up with email: moderator@olympiad.bd and password: Moderator@123456
  4. The trigger will automatically assign the correct roles

  ## Notes
  - Profiles are automatically created when users sign up
  - Email-based role assignment happens automatically
  - Change passwords after first login for security
*/

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role text;
  user_name text;
BEGIN
  -- Determine role based on email
  IF NEW.email = 'admin@olympiad.bd' THEN
    user_role := 'admin';
    user_name := 'System Administrator';
  ELSIF NEW.email = 'moderator@olympiad.bd' THEN
    user_role := 'moderator';
    user_name := 'System Moderator';
  ELSE
    user_role := 'participant';
    user_name := COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name', 
      split_part(NEW.email, '@', 1)
    );
  END IF;

  -- Insert profile for the new user
  INSERT INTO public.profiles (
    id,
    email,
    name,
    role,
    status,
    institution,
    phone,
    registration_date,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    user_name,
    user_role,
    'active',
    CASE 
      WHEN user_role IN ('admin', 'moderator') THEN 'Bangladesh Olympiad'
      ELSE COALESCE(NEW.raw_user_meta_data->>'institution', NULL)
    END,
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    NOW(),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Also create trigger for updates (in case email changes)
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.email IS DISTINCT FROM NEW.email)
  EXECUTE FUNCTION public.handle_new_user();

-- Display helpful message
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Auto Profile Creation Setup Complete!';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'To create admin and moderator accounts:';
  RAISE NOTICE '';
  RAISE NOTICE '1. Go to Supabase Dashboard';
  RAISE NOTICE '2. Navigate to Authentication > Users';
  RAISE NOTICE '3. Click "Add User"';
  RAISE NOTICE '';
  RAISE NOTICE 'Admin Account:';
  RAISE NOTICE '  Email: admin@olympiad.bd';
  RAISE NOTICE '  Password: Admin@123456';
  RAISE NOTICE '';
  RAISE NOTICE 'Moderator Account:';
  RAISE NOTICE '  Email: moderator@olympiad.bd';
  RAISE NOTICE '  Password: Moderator@123456';
  RAISE NOTICE '';
  RAISE NOTICE 'Roles will be assigned automatically!';
  RAISE NOTICE '========================================';
END $$;
