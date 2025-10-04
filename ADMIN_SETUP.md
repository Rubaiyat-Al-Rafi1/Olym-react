# Admin and Moderator Account Setup

This document provides instructions for creating admin and moderator accounts for the Bangladesh Olympiad platform.

## Automatic Role Assignment

The database is configured to automatically assign roles based on email addresses:
- `admin@olympiad.bd` → **admin** role
- `moderator@olympiad.bd` → **moderator** role
- Any other email → **participant** role

## Method 1: Via Supabase Dashboard (Recommended)

### Step 1: Access Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users** in the sidebar

### Step 2: Create Admin User
1. Click **"Add User"** button
2. Select **"Create new user"**
3. Fill in the form:
   - **Email**: `admin@olympiad.bd`
   - **Password**: `Admin@123456`
   - **Check**: ✓ Auto Confirm User
4. Click **"Create User"**
5. The system will automatically create a profile with **admin** role

### Step 3: Create Moderator User
1. Click **"Add User"** button again
2. Select **"Create new user"**
3. Fill in the form:
   - **Email**: `moderator@olympiad.bd`
   - **Password**: `Moderator@123456`
   - **Check**: ✓ Auto Confirm User
4. Click **"Create User"**
5. The system will automatically create a profile with **moderator** role

## Method 2: Via Application Signup

### For Admin:
1. Go to your application's signup page
2. Fill in the signup form:
   - **Name**: System Administrator
   - **Email**: admin@olympiad.bd
   - **Password**: Admin@123456
   - **Confirm Password**: Admin@123456
3. Submit the form
4. The profile will be automatically created with **admin** role

### For Moderator:
1. Go to your application's signup page
2. Fill in the signup form:
   - **Name**: System Moderator
   - **Email**: moderator@olympiad.bd
   - **Password**: Moderator@123456
   - **Confirm Password**: Moderator@123456
3. Submit the form
4. The profile will be automatically created with **moderator** role

## Method 3: Via SQL (Advanced)

If you need to create users directly via SQL in the Supabase SQL Editor:

```sql
-- This requires Supabase auth extensions to be properly configured
-- It's recommended to use Method 1 (Dashboard) instead

-- The trigger will automatically create profiles with correct roles
-- when these users are created through Supabase Auth
```

## Login Credentials

Once created, you can log in with:

### Admin Account
- **Email**: admin@olympiad.bd
- **Password**: Admin@123456
- **Access**: Full system administration

### Moderator Account
- **Email**: moderator@olympiad.bd
- **Password**: Moderator@123456
- **Access**: Exam management, question management, results management

## Verification

After creating the accounts, you can verify they were created correctly:

### Via SQL Editor
```sql
-- Check if profiles were created
SELECT id, email, name, role, status
FROM profiles
WHERE email IN ('admin@olympiad.bd', 'moderator@olympiad.bd');
```

### Via Application
1. Go to the login page
2. Log in with admin credentials
3. You should be redirected to the Admin Dashboard
4. Log out and repeat with moderator credentials
5. You should be redirected to the Moderator Dashboard

## Security Recommendations

⚠️ **IMPORTANT**: After first login, please:

1. **Change passwords immediately**
   - Use strong, unique passwords
   - Minimum 12 characters with mixed case, numbers, and symbols

2. **Enable Multi-Factor Authentication (MFA)**
   - Add an extra layer of security
   - Available in Supabase Auth settings

3. **Restrict access**
   - Only share credentials with trusted administrators
   - Use individual accounts instead of shared credentials when possible

4. **Monitor activity**
   - Regularly review admin actions
   - Check authentication logs in Supabase Dashboard

## Troubleshooting

### Profile not created automatically
If the profile doesn't get created automatically:
1. Check if the trigger is enabled: `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`
2. Manually run: `SELECT public.handle_new_user();`
3. Or create profile manually via SQL Editor

### Wrong role assigned
If a user has the wrong role:
```sql
-- Fix admin role
UPDATE profiles
SET role = 'admin', status = 'active'
WHERE email = 'admin@olympiad.bd';

-- Fix moderator role
UPDATE profiles
SET role = 'moderator', status = 'active'
WHERE email = 'moderator@olympiad.bd';
```

### Cannot log in
1. Verify the user exists in Authentication > Users
2. Check that email is confirmed
3. Verify password is correct
4. Check that the profile exists in the profiles table

## Support

For additional help:
- Check Supabase documentation: https://supabase.com/docs
- Review authentication logs in Supabase Dashboard
- Contact system administrator

---

**Last Updated**: 2025-10-04
**Database Schema Version**: 2.0
