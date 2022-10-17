import Navbar from '../Navbar';

const Layout: React.FC<{ children: any }> = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
};

export default Layout;
