const Banner = () => {
  return (
    <div
      className="hero min-h-[calc(100vh-66px)]"
      style={{
        backgroundImage: "url(https://i.ibb.co/FqMnqkX/Untitled-design.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold bg-gradient-to-r from-green-700 to-red-700">
            Unleash Innovation with IGNITIONPULSE
          </h1>
          <p className="mb-5 text-lg bg-gradient-to-r from-slate-600 to-orange-500">
            Discover, Share, and Experience the Latest in Tech
          </p>
          <button className="btn btn-accent">Explore Now</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
