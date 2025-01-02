import React from "react";
import { Link } from "react-router-dom";
import {
  FaVideo,
  FaCheckCircle,
  FaNetworkWired,
  FaBrain,
  FaShieldAlt,
  FaBars
} from "react-icons/fa";
import networkIllustration from "../../assets/networkIllustration.jpg";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from '@/assets/images/RAPPORT.png'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Home = () => {
  return (
    <div className="bg-gray-100 border-l border-r shadow">
      <div className="bg-blue-100/15">
        {/* Header */}
        <HomeHeader />

        {/* Hero Section */}
        <main className="px-6 py-12">
          {/* Title and Description */}
          <div className="text-center mb-12">
            <h2 className="lg:text-6xl md:text-4xl text-xl font-extrabold text-gray-900 mb-4">
              The Future of Professional Networking
            </h2>
            <p className="text-gray-600 lg:text-lg md:text-sm text-xs lg:max-w-2xl md:max-w-lg max-w-xs mx-auto">
              Revolutionizing how talent connects with opportunities through
              AI-powered video profiles and verified professional networks.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Video-First Platform */}
            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="lg:text-lg md:text-xl text-sm font-bold">
                  <FaVideo className="text-4xl text-blue-500 mb-4" />
                  Video-First Platform
                </CardTitle>
                <CardDescription className="lg:text-lg md:text-sm text-xs text-gray-600">
                  Break free from traditional resumes with engaging video
                  introductions that showcase your true potential.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Verified Network */}
            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="lg:text-lg md:text-xl text-sm font-bold">
                  <FaShieldAlt className="text-4xl text-blue-500 mb-4" />
                  Verified Network
                </CardTitle>
                <CardDescription className="lg:text-lg md:text-sm text-xs text-gray-600">
                  Connect with confidence through our US address verification
                  system.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* AI-Powered Matching */}
            <Card className="shadow-md bg-white">
              <CardHeader>
                <CardTitle className="lg:text-lg md:text-xl text-sm font-bold">
                  <FaBrain className="text-4xl text-blue-500 mb-4" />
                  AI-Powered Matching
                </CardTitle>
                <CardDescription className="lg:text-lg md:text-sm text-xs text-gray-600">
                  Let our advanced AI analyze videos to match skills with
                  opportunities.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Image and CTA Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Image */}
            <div
              className="w-full md:w-1/2 h-[70vh] rounded-md"
              style={{
                backgroundImage: `url(${networkIllustration})`,
                backgroundSize: "cover",
                boxShadow: "inset 0 0 0 2000px rgba(39, 126, 245, 0.2)",
              }}
            >
              {/* <img
                src={networkIllustration}
                alt="Professional Network Graphic"
                className="w-full h-auto rounded shadow-[inset 0 0 0 2000px rgba(39, 126, 245, 1)]"
                style={{boxShadow: 'inset 0 0 0 2000px rgba(39, 126, 245, 1)'}}
              /> */}
            </div>

            {/* Text and Buttons */}
            <div className="text-center md:text-left md:w-1/2">
              <h3 className="lg:text-2xl md:text-xl text-lg font-extrabold text-gray-900 mb-4">
                More Than Just Another Professional Network
              </h3>
              <p className="text-gray-600 lg:text-lg md:text-base text-sm mb-6">
                We’re transforming professional networking by combining the
                power of video, AI, and verified connections to create
                meaningful professional relationships.
              </p>
              <div className="flex space-x-4 justify-center md:justify-start">
                <Link to="/job-seekers">
                  <Button
                    variant="default"
                    className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
                  >
                    Find Your Next Role
                  </Button>
                </Link>
                <Link to="/recruiters">
                  <Button
                    variant="outline"
                    className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
                  >
                    Find Top Talent
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
          <FaBars className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <div className="flex flex-col space-y-4 mt-8">
          <Link to="/job-seekers">
            <Button
              variant="outline"
              className="w-full text-sm border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-white font-semibold"
            >
              For Job Seekers
            </Button>
          </Link>
          <Link to="/recruiters">
            <Button
              variant="default"
              className="w-full text-sm font-semibold bg-blue-500 hover:bg-white hover:border-blue-500 hover:border hover:text-blue-500"
            >
              For Recruiters
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const HomeHeader = () => {
  return (
    <header className="flex justify-between bg-white h-14 items-center px-6 py-2 border-b shadow-md">
      <div className="h-8 w-auto flex-shrink-0">
        <img
          src={logo}
          alt="logo"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Desktop Buttons */}
      <div className="hidden lg:flex space-x-4">
        <Link to="/job-seekers">
          <Button
            variant="outline"
            size="sm"
            className="text-sm border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-white font-semibold"
          >
            For Job Seekers
          </Button>
        </Link>
        <Link to="/recruiters">
          <Button
            variant="default"
            size="sm"
            className="text-sm font-semibold bg-blue-500 hover:bg-white hover:border-blue-500 hover:border hover:text-blue-500"
          >
            For Recruiters
          </Button>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <MobileMenu />
      </div>
    </header>
  );
};

export default Home;

