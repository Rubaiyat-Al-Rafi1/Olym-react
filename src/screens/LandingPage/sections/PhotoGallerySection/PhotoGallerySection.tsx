import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const PhotoGallerySection = (): JSX.Element => {
  const navigate = useNavigate();

  // Stats data for the bottom card
  const statsData = [
    {
      icon: "/vector-7.svg",
      title: "Students",
      count: "50,000+",
      iconClass: "relative h-5 top-0.5 bg-[url(/vector-7.svg)] bg-[100%_100%]",
    },
    {
      title: "Schools",
      count: "500+",
      iconComponent: (
        <div className="relative h-[21px]">
          <img
            className="absolute w-[19px] h-3.5 top-[7px] left-[5px]"
            alt="Vector"
            src="/vector-6.svg"
          />
          <img
            className="absolute w-6 h-[9px] top-0 left-0"
            alt="Vector"
            src="/vector-2.svg"
          />
        </div>
      ),
    },
    {
      title: "Subjects",
      count: "12",
      iconClass:
        "relative w-5 h-5 top-0.5 left-0.5 bg-[url(/vector-5.svg)] bg-[100%_100%]",
    },
  ];

  return (
    <section className="w-full max-w-[1024px] mx-auto py-12">
      <div className="bg-[#fff2f2] p-14">
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          {/* Left side - Image with stats */}
          <div className="w-full md:w-[482px] relative">
            <div className="relative">
              <img
                className="w-full h-[306px] object-cover"
                alt="Cyber Olympiad Participants"
                src="/image-1.png"
              />

              <Card className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[454px] rounded-[9px]">
                <CardContent className="p-6">
                  <div className="flex justify-center items-start gap-8">
                    {statsData.map((stat, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                          {stat.iconComponent ? (
                            <div className="w-6 h-6">{stat.iconComponent}</div>
                          ) : (
                            <div className="w-6 h-6">
                              <div className={stat.iconClass} />
                            </div>
                          )}
                          <span className="font-['Poppins',Helvetica] font-medium italic text-[#666a93] text-xs">
                            {stat.title}
                          </span>
                        </div>
                        <span className="font-['Poppins',Helvetica] font-medium italic text-[#666a93] text-xs mt-1">
                          {stat.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side - Content and CTA */}
          <div className="w-full md:w-[462px]">
            <Card className="rounded-[6px_6px_100px_6px] h-[311px]">
              <CardContent className="p-10">
                <div className="font-['Montagu_Slab',Helvetica] text-[26px] leading-[26px]">
                  <span className="font-semibold text-[#666a93]">
                    Explore Academic Excellence with Bangladesh Olympiad
                  </span>

                  <div className="mt-6 font-['Poppins',Helvetica] font-medium italic text-[#666a93] text-base leading-5">
                    Unleash your academic potential in a nationwide competition designed to
                    spark curiosity, test your knowledge, and celebrate
                    learning. Compete, grow, and shine among the brightest
                    students—this is more than an exam, it&apos;s your pathway
                    to academic excellence.
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-4">
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-green-600 to-red-500 hover:from-green-700 hover:to-red-600 text-white rounded-[100px] font-['Inter',Helvetica] font-extrabold italic text-sm px-8 py-3 shadow-[0px_4px_4px_#00000040] transform hover:scale-105 transition-all duration-300"
              >
                নিবন্ধন করুন
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
