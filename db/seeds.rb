Location.create([
  { name: "Grand Bahama" }, { name: "Berry Islands" }, { name: "Bimini Islands" }, { name: "Great Abaco" },
  { name: "Little Abaco" }, { name: "Eleuthera" }, { name: "Andros" }, { name: "New Providence/Nassau" },
  { name: "Cat Island" }, { name: "San Salvador" }, { name: "Long Island" },{ name: "Inagua" },
  { name: "Mayaguana" }, { name: "Exumas" }, { name: "Crooked Island/ Acklins Island" }, { name: "Freeport" }
]);

Category.create({ name: "Vehicles"}).sub_category.create([
  { name: "Boats" }, { name: "Cars/Trucks" }, { name: "Scooters" }, { name: "Motorcycles" },
  { name: "eavy Equipment" }, { name: "Auto parts/Tires" }
]);
Category.create({ name: "Electronics"}).sub_category.create([
  { name: "Computers" }, { name: "Cameras" }, { name: "Phones" }, { name: "Video games" },
  { name: "Ipod’s" }, { name: "Headphones," }, { name: "Wires" }, { name: "Chargers" },
  { name: "Televisions" }
]);
Category.create({ name: "Jewellery"}).sub_category.create([
  { name: "Watches" }, { name: "Bracelets" }, { name: "Necklaces" }, { name: "Rings" },
  { name: "Earrings" }
]);
Category.create({ name: "Services"}).sub_category.create([
  { name: "Personal trainer" }, { name: "Nanny/Childcare" }, { name: "Music lessons" }, { name: "Tutors" },
  { name: "Photographers" }, { name: "Law" }, { name: "Cleaning" }, { name: "Plumbing" }, { name: "Moving/Storage" }
]);
Category.create({ name: "Housing"}).sub_category.create([
  { name: "Real estate" }, { name: "Apartments/Condos" }, { name: "Rentals" }, { name: "Storage/Parking" },
  { name: "Land for sale" }, { name: "Offices" }
]);
Category.create({ name: "Miscellaneous"}).sub_category.create([
  { name: "Art" }, { name: "Books" }, { name: "Sporting goods" }, { name: "Musical instruments" },
  { name: "Furniture" }, { name: "Tools" }, { name: "Tickets" }, { name: "Health products" },
  { name: "Bikes" }, { name: "Clothing" }, { name: "Home appliances" }, { name: "Fishing equipment" },
  { name: "farm/ garden" }, { name: "Toys" }, { name: "Clothes" }, { name: "Shoes" }
]);