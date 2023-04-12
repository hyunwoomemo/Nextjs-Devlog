import Head from "next/head";
import React from "react";

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{`${title} | hyunwoomemo`}</title>
    </Head>
  );
};

export default Seo;
