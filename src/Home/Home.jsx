import PageTitle from "../Helmet/PageTitle";
import Banner from "./Banner";
import Coupon from "./Coupon";
import Featured from "./Featured";
import Trending from "./Trending";

const Home = () => {
  return (
    <div>
      <PageTitle title="Home | IgnitionPulse"></PageTitle>
      <Banner></Banner>
      <Featured></Featured>
      <Trending></Trending>
      <Coupon></Coupon>
    </div>
  );
};

export default Home;
