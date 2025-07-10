// ConferenceEvent.jsx COMPLETO Y COMENTADO

import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";

// Acciones para manejar las salas (venue)
import { incrementQuantity, decrementQuantity } from "./venueSlice";

// Acciones para manejar los complementos audiovisuales (add-ons)
import { incrementAvQuantity, decrementAvQuantity } from "../avSlice";

// Acciones para manejar las comidas (meals)
import { incrementMealQuantity, decrementMealQuantity } from "../mealSlice";

const ConferenceEvent = () => {
  // Estados locales: mostrar detalles y número de personas
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  // Obtener los estados de Redux
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealItems = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  // Cálculo para restringir a 3 auditorios máximo
  const remainingAuditoriumQuantity =
    3 - venueItems.find((item) => item.name === "Auditorium Hall (Capacity:200)").quantity;

  // Alternar la vista de detalles
  const handleToggleItems = () => {
    setShowItems(!showItems);
  };

  // Agregar sala al carrito (venue)
  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    ) return;
    dispatch(incrementQuantity(index));
  };

  // Remover sala del carrito (venue)
  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  // Agregar complemento audiovisual
  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };

  // Remover complemento audiovisual
  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  };

  // Agregar comida
  const handleIncrementMealQuantity = (index) => {
    dispatch(incrementMealQuantity(index));
  };

  // Remover comida
  const handleDecrementMealQuantity = (index) => {
    dispatch(decrementMealQuantity(index));
  };

  // Calcular costo total según la sección
  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "addons") {
      avItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "meals") {
      mealItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    }
    return totalCost;
  };

  // Obtener totales por categoría
  const venueTotalCost = calculateTotalCost("venue");
  const addonTotalCost = calculateTotalCost("addons");
  const mealsTotalCost = calculateTotalCost("meals");

  // Navegación con anclas y mostrar secciones
  const navigateToProducts = (idType) => {
    if (["#venue", "#addons", "#meals"].includes(idType)) {
      if (!showItems) {
        setShowItems(true);
      }
    }
  };

  return (
    <>
      {/* BARRA SUPERIOR */}
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>Venue</a>
            <a href="#addons" onClick={() => navigateToProducts("#addons")}>Add-ons</a>
            <a href="#meals" onClick={() => navigateToProducts("#meals")}>Meals</a>
          </div>
          <button className="details_button" onClick={handleToggleItems}>Show Details</button>
        </div>
      </navbar>

      <div className="main_container">
        {!showItems ? (
          // Vista principal: selección de ítems
          <div className="items-information">

            {/* SECCIÓN: Venue */}
            <div id="venue" className="venue_container container_main">
              <div className="text"><h1>Venue Room Selection</h1></div>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img"><img src={item.img} alt={item.name} /></div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      <button
                        className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-warning btn-plus"}
                        onClick={() => handleRemoveFromCart(index)}
                      >&#8211;</button>
                      <span className="selected_count">{item.quantity}</span>
                      <button
                        className={item.name === "Auditorium Hall (Capacity:200)" && remainingAuditoriumQuantity === 0 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                        onClick={() => handleAddToCart(index)}
                      >&#43;</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
            </div>

            {/* SECCIÓN: Add-ons */}
            <div id="addons" className="venue_container container_main">
              <div className="text"><h1>Add-ons Selection</h1></div>
              <div className="addons_selection">
                {avItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img"><img src={item.img} alt={item.name} /></div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      <button
                        className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-warning btn-plus"}
                        onClick={() => handleDecrementAvQuantity(index)}
                      >&#8211;</button>
                      <span className="selected_count">{item.quantity}</span>
                      <button
                        className="btn-success btn-plus"
                        onClick={() => handleIncrementAvQuantity(index)}
                      >&#43;</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${addonTotalCost}</div>
            </div>

            {/* SECCIÓN: Meals */}
            <div id="meals" className="venue_container container_main">
              <div className="text"><h1>Meals Selection</h1></div>
              <div className="meal_selection">
                {mealItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img"><img src={item.img} alt={item.name} /></div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      <button
                        className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-warning btn-plus"}
                        onClick={() => handleDecrementMealQuantity(index)}
                      >&#8211;</button>
                      <span className="selected_count">{item.quantity}</span>
                      <button
                        className="btn-success btn-plus"
                        onClick={() => handleIncrementMealQuantity(index)}
                      >&#43;</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${mealsTotalCost}</div>
            </div>
          </div>
        ) : (
          // Vista de resumen
          <div className="total_amount_detail">
            <TotalCost
              totalCosts={{ venueTotalCost, addonTotalCost, mealsTotalCost }}
              handleClick={handleToggleItems}
              ItemsDisplay={() => null} // Reemplazar si deseas mostrar los ítems seleccionados
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;
