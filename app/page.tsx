import { TestComponent } from "./components/test";

const Home = () => {
  return (
    <main>
      <div>This is the top</div>
      <div>This is the image fixed</div>
      <div>
        This is the body
        <TestComponent />
      </div>
      Testing commit number 2
    </main>
  );
};

export default Home;
