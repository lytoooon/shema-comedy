import Collaborations from "@/components/Collaborations";
import Footer from "@/components/Footer";
import FeedExperience from "@/components/FeedExperience";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import PersonalLife from "@/components/PersonalLife";
import StatsAndWorks from "@/components/StatsAndWorks";

export default function Home() {
  return (
    <>
      <NavBar />
      <FeedExperience>
        <Hero />
        <StatsAndWorks />
        <Collaborations />
        <PersonalLife />
        <Footer />
      </FeedExperience>
    </>
  );
}
