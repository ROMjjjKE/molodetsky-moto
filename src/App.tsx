import Header from './components/Header';
import Hero from './components/Hero';
import Directions from './components/Directions';
import Check from './components/Check';
import Classes from './components/Classes';
import Select from './components/Select';
import Claims from './components/Claims';
import Faq from './components/Faq';
import Ask from './components/Ask';
import Footer from './components/Footer';
import { useLenis } from './components/useLenis';
import { useReveal } from './components/useReveal';

export default function App() {
  useLenis();
  useReveal('home');

  return (
    <>
      <a className="skip" href="#napravleniya">К содержанию</a>
      <Header />
      <main>
        <Hero />
        <Directions />
        <Check />
        <Classes />
        <Select />
        <Claims />
        <Faq />
        <Ask />
      </main>
      <Footer />
    </>
  );
}
