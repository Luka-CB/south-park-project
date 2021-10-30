import React from "react";

const AboutPage = () => {
  return (
    <div className="about_container">
      <div className="text">
        <h1>South Park Demo Web Application</h1>
        <p>
          This website is created to be showcased in my{" "}
          <a
            href="https://my-portfolio-rosy-phi.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            portfolio
          </a>
          . Website is created using <span>React</span> as a frontend with{" "}
          <span>Redux</span> for state management. <span>NodeJs</span> as a
          backend. <span>scss</span> is used for styling. <span>Postgres</span>{" "}
          database is used through <span>Prisma ORM</span> .
        </p>
        <p>
          Code is available{" "}
          <a
            href="https://github.com/Luka-CB/south-park-project"
            target="_blank"
            rel="noreferrer"
          >
            HERE
          </a>
        </p>
      </div>
      <div className="image">
        <img
          src="https://res.cloudinary.com/coolbonn/image/upload/v1633616768/5871702f7b7f6103e35c6cab_pdlfpd.png"
          alt="Goth kids from south park"
        />
      </div>
    </div>
  );
};

export default AboutPage;
