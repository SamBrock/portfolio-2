import React, { useState } from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/layouts/layout';
import Projects from '../components/projects';
import SocialLinks from '../components/social-links';

import '../styles/main.scss';

export default function Index({ data }) {
  const [accentColor, setAccentColor] = useState();
  const isMobile = window.innerWidth < 768;

  return (
    <Layout>
      <div className="index">
        <section className="overview">
          <div className="intro">
            <h1>Hi, <br /> I'm Sam, <br /> web developer.</h1>
            <p>I use modern web technologies to create engaging online
            experiences. I'm currently a Web Technologies student at the University of
            Huddersfield, graduating in 2021. </p>
            <a className="btn primary-bg" style={{ color: accentColor, border: `1px solid ${accentColor}` }} href="mailto:sambrocklehurst1998@gmail.com">Get in touch</a>
          </div>
        </section>
        <SocialLinks />
        <Projects data={data.projects.edges} setAccent={(color) => setAccentColor(color)} isMobile={isMobile} />
      </div>
    </Layout>
  )
}

export const query = graphql`
query IndexQuery {
  projects: allProjectsJson {
    edges {
      node {
        title
        type
        shortDescription
        completed
        url
        color
      }
    }
  }
}
`;