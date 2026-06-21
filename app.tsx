import React from "https://esm.sh/react@18";
import Layout from "./layout.tsx";

const App: React.FC = () => {
  return (
    <Layout>
      <section id="center">
        <h2>Welcome to Sample Site</h2>
        <p>This is a starter page. Replace with your own content.</p>
      </section>
    </Layout>
  );
};

export default App;
