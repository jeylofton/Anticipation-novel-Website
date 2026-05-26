import { TopBar } from "@/components/ui/TopBar";
import { Footer } from "@/components/ui/Footer";
import { ScrollDepthTracker } from "@/components/ui/ScrollDepthTracker";
import { Hero } from "@/components/sections/Hero";
import { Question } from "@/components/sections/Question";
import { Reveal } from "@/components/sections/Reveal";
import { Divider } from "@/components/sections/Divider";
import { Invitation } from "@/components/sections/Invitation";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { LastDoor } from "@/components/sections/LastDoor";

export default function Page() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Question />
        <Reveal />
        <Divider />
        <Invitation />
        <About />
        <Faq />
        <LastDoor />
      </main>
      <Footer />
      <ScrollDepthTracker />
    </>
  );
}
