import React, { useEffect, useState } from 'react'
import TransitionLink from "gatsby-plugin-transition-link";
import { maskAnimate } from '../animations/animations';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { headerAnimateUp, headerAnimateDown } from '../animations/animations'

// import Logo from '../images/logo.svg'
import Logo from '../components/images/logo';
import { useWindowSize } from '../hooks/useWindowSize';

export default function Header() {
  const [hide, setHide] = useState(null);
  const [bg, setBg] = useState(false);

  const [width, height] = useWindowSize();
  const scrollDir = useScrollDirection();
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (scrollDir === 'up') setHide(false);
    if (scrollDir === 'down' && hide) setHide(false);
    if (scrollDir === 'down' && !hide) setHide(true);
  }, [scrollDir])

  useEffect(() => {
    function onScroll() {
      setBg(window.pageYOffset > (height * 0.8 - 85));
    }

    return window.addEventListener("scroll", onScroll);
  }, [bg, height]);

  useEffect(() => {
    if (hide && isMobile) headerAnimateUp().play();
    if (!hide && isMobile) headerAnimateDown().play();
  }, [hide, isMobile])

  return (
    <header className={`header ${hide ? 'hide' : ''} ${bg ? 'bg' : ''}`}>
      <TransitionLink to="/" exit={{ trigger: ({ exit, node }) => maskAnimate().play(), length: 1 }} entry={{ delay: 1 }}>
        <Logo classes="logo" />
      </TransitionLink>
    </header>
  )
}
