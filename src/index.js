import React from "react"; // This library is used to define and create React components. It is a fundamental part of React and provides all the necessary tools for building user interfaces.
import ReactDOM from "react-dom/client"; // This library is used for rendering React components into the DOM (Document Object Model), which is the structure that represents your web page in the browser.
import "./index.css"; // This is a CSS file that contains styles for your React components.

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// This is a React functional component. It is a function that returns a React element.
// This component's function returns some JSX (JavaScript XML), which represents the structure and content of a part of the user interface.
// In this case, it's a simple div element containing the text "Hello World."
// It's important to note that you should never nest React components inside each other without returning a single parent component. In other words, you can't return multiple sibling components from a single component function. You can only return a single parent component that contains all the other components you want to render. It's bad practice to do so.
function App() {
  // Never to this. This is bad practice. (Nesting components without returning a single parent component.)
  // function Pizza() {
  //     return <h2>Pizza</h2>;
  //   }

  return (
    <div className="container">
      {/* These components are nested inside the App component. In other words, the Pizza component is called inside the App component.*/}
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

// This is the parent component to the Pizza component (child).
// Menu component creates instances of the Pizza component by providing specific data for each pizza item as props.
function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 ? (
        // <React.Fragment>
        <>
          <p>
            Authentic Italian cuisin. 6 creative dishes to choose from. All from
            our stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {/* We can't use the forEach method because we need to return a new array within the JSX and the map method returns a new array. */}
            {pizzas.map((pizza) => (
              // For each item (pizza), a Pizza component is rendered.
              // The pizza object is passed to the Pizza component as props.
              // key is used to help React efficiently update and render components. It should be a unique identifier for each rendered component.
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
         </>
        // </React.Fragment>
      ) : (
        <p>We're working on our menu. Please come back later :)</p>
      )}
    </main>
  );
}

// This is a child component to the Menu component (parent).
// The Pizza  component takes a single argument, props, which contains the data passed down from the parent component.
// The props.pizzaObj object contains the data for the specific pizza being rendered.
// Inside the Pizza component, you can access the properties of pizzaObj to display the pizza's name, ingredients, price, and other details.
// By using the map method and passing data via props, you can create a dynamic list of pizza items, each with its own data, while maintaining a clear parent-child component structure in your React application.
// function Pizza(props) {
//   console.log(props);

//   if (props.pizzaObj.soldOut) {
//     return null;
//   }

//   return (
//     <li className="pizza">
//       <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
//       <div>
//         <h3>{props.pizzaObj.name}</h3>
//         <p>{props.pizzaObj.ingredients}</p>
//         <span>${props.pizzaObj.price}</span>
//       </div>
//     </li>
//   );
// }

// Destructuring props. Always make sure to destructure props in the function's argument using curly braces.
function Pizza({ pizzaObj }) {
  console.log(pizzaObj);

  // Check if the pizza is sold out. If it is, return null (don't render it).
  // if (pizzaObj.soldOut) {
  //   return null;
  // }

  // If the pizza is not sold out, render the pizza information.
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        {/* <span>{pizzaObj.soldOut ? "SOLD OUT!" :"$" + pizzaObj.price}</span> */}
        <span>{pizzaObj.soldOut ? "SOLD OUT!" : `$${pizzaObj.price}`}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 9;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {/* We're in the JavaScript mode here returning some more JSX. The JSX content is conditionally rendered based on the value of 'isOpen'
     So, the JSX content will only be rendered into the DOM if the condition is a truthy value.
     Another thing to note is that React won't render true or false but a number*/}
      {isOpen ? (
        <Order closeHourObj={closeHour} openHourObj={openHour} />
      ) : (
        <p>We are closed. Sorry!</p>
      )}
    </footer>
  );
}

// If you try to destructure a property that doesn't exist it will simply be undefined.
function Order({ closeHourObj, openHourObj }) {
  return (
    <div className="order">
      <p>
        We are open from {openHourObj}:00 to {closeHourObj}:00. Come visit us or
        order!
      </p>

      <button className="btn">Order</button>
    </div>
  );
}

/// React v18
// This function is used to specify the root of the React application where your components will be rendered. The document.getElementById("root") part finds the HTML element with the ID "root" in your HTML file. This is where your React app will be mounted.
// The root.render() method is used to render your React component tree into the DOM.
// <React.StrictMode> is a component that helps identify potential issues in your application and encourages best practices. It's used as a wrapper around your main component App in this example.
// <App /> is the usage of your App component, which you defined earlier. It represents the content and structure you want to render.
// Angle Brackets < >: In JSX, angle brackets are used to enclose and define components. They are similar to HTML tags. When you see <Something /> in JSX, it means you are referring to a React component named "Something." Components are reusable building blocks in React that encapsulate a piece of the user interface.
// App: In this case, App is the name of a React component. It's essentially a JavaScript function that returns a description of what the component should render.
// This function defines the App component, and when you write <App />, you are telling React to render the content returned by the App component function.
// Space After App: The space after the component name and before the closing slash, as in <App />, is not required by the JSX syntax, but it's a common convention for clarity and readability. It's equivalent to writing <App/> (without a space). The space makes it easier to distinguish the component name from other parts of your JSX code and follows a style convention that many React developers prefer.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/// React before 18
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
