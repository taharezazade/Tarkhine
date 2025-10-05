const MiniMenuRestaurantData = [
  {
    id: 1,
    name: "Drink",
    imagePrimary: "/image/Drink.jpg",
    count: 15,
    description: "Refreshing cocktails, juices and soft drinks.",
    slug: "/menu/drink",
  },
  {
    id: 2,
    name: "Dessert",
    imagePrimary: "/image/Dessert.jpg",
    count: 15,
    description: "Sweet cakes, pastries and ice creams.",
    slug: "/menu/dessert",
  },
  {
    id: 3,
    name: "Appetizer",
    imagePrimary: "/image/Appetizer.jpg",
    count: 25,
    description: "Tasty starters and light snacks.",
    slug: "/menu/appetizer",
  },
  {
    id: 4,
    name: "Main course",
    imagePrimary: "/image/Main-course.jpg",
    count: 40,
    description: "Hearty and delicious main dishes.",
    slug: "/menu/main-course",
  },
];

function MenuItemCard({ item }) {
  return (
    <div
      className="rounded-2xl md:my-0 my-4 group grayscale hover:grayscale-0 relative md:w-1/4 w-full h-56 overflow-hidden transition-all duration-300 bg-center bg-no-repeat bg-cover shadow-lg cursor-pointer"
      style={{ backgroundImage: `url(${item.imagePrimary})` }}>
      {/* Overlay */}
      <div className="bg-black/40 absolute inset-0 flex flex-col items-center justify-center p-2 text-white">
        <h3 className="text-2xl font-bold">{item.name}</h3>
      </div>
    </div>
  );
}

function MenuRestaurant() {
  return (
    <div className="h-fit w-full mt-5">
      <p className="text-4xl items-center font-light justify-center flex md:pb-4">
        <p className="text-emerald-500 font-black inline">Our</p>&nbsp;Menu
      </p>
      <div className="md:flex md:flex-row items-center grid-cols-1 justify-between md:w-11/12 w-full gap-4 mx-auto">
        {MiniMenuRestaurantData.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default MenuRestaurant;
