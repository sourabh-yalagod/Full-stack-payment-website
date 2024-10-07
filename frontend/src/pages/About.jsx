import { MoveLeft } from "lucide-react";
import Button from "../components/Button";
import { ModeToggle } from "../components/mode-toggle";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen p-6 dark:bg-gray-900 bg-white">
      <div className="w-full flex justify-between">
        <Button
          onclick={() => navigate(-1)}
          text={
            <MoveLeft className="bg-blue-600 size-9 font-bold hover:scale-90 transition-all text-white p-2 rounded-md" />
          }
        />
        <ModeToggle />
      </div>
      <section className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold mb-6 dark:text-yellow-300 text-blue-600">
          About Us
        </h1>
        <p className="mb-4 text-lg dark:text-gray-300 text-gray-700">
          Welcome to our platform! We are committed to providing you with the
          best service and experience. Our goal is to ensure that our users can
          seamlessly interact with the content we offer.
        </p>
        <p className="mb-6 text-lg dark:text-gray-300 text-gray-700">
          Our team consists of passionate individuals who continuously strive to
          innovate and improve our platform. Whether you're here to learn,
          create, or explore, we are here to support you.
        </p>
      </section>

      <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 py-12">
        <div className="p-6 dark:bg-gray-800 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold dark:text-white text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="dark:text-gray-300 text-gray-700">
            Our mission is to provide users with a platform where they can
            achieve their goals, be it personal or professional. We aim to
            deliver value through innovation and continuous improvement.
          </p>
        </div>

        <div className="p-6 dark:bg-gray-800 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold dark:text-white text-gray-900 mb-4">
            Our Vision
          </h2>
          <p className="dark:text-gray-300 text-gray-700">
            We envision a world where everyone has access to the tools and
            knowledge they need to succeed. Our platform is built to empower
            individuals to take control of their journey.
          </p>
        </div>
      </section>

      <footer className="max-w-4xl mx-auto text-center py-6">
        <p className="text-sm dark:text-gray-500 text-gray-600">
          &copy; 2024 Our Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
