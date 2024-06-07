import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const rares = [
  "Amazing Rare",
  "Common",
  "LEGEND",
  "Promo",
  "Rare",
  "Rare ACE",
  "Rare BREAK",
  "Rare Holo",
  "Rare Holo EX",
  "Rare Holo GX",
  "Rare Holo LV.X",
  "Rare Holo Star",
  "Rare Holo V",
  "Rare Holo VMAX",
  "Rare Prime",
  "Rare Prism Star",
  "Rare Rainbow",
  "Rare Secret",
  "Rare Shining",
  "Rare Shiny",
  "Rare Shiny GX",
  "Rare Ultra",
  "Uncommon",
];

function App() {
  const [sets, setSets] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [cards, setCards] = useState([]);
  const [pokemonName, setPokemonName] = useState("");

  // useEffect(() => {
  //   fetchSets();
  //   // fetchCard();
  // }, []);

  console.log("name", pokemonName);

  const fetchSets = async () => {
    try {
      const request = await fetch(`https://api.pokemontcg.io/v2/sets`, {
        headers: { "X-Api-Key": "b2a5915d-8a85-44fb-82ce-2aabc8b37b73" },
      });
      const response = await request.json();
      console.log("data", response.data);
      setSets(response.data);
    } catch (err) {
      console.error("Error", err);
    }
  };

  const fetchCards = async () => {
    // set.id:sv3pt5 rarity:"Rare"
    try {
      const request = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`,
        {
          headers: { "X-Api-Key": "b2a5915d-8a85-44fb-82ce-2aabc8b37b73" },
        }
      );
      const response = await request.json();
      setCards(response.data);
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        margin: "50px",
      }}
    >
      <div
        style={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>View Pokemon Cards</h2>
        <label>Enter Pokemon Name:</label>
        <input
          type="text"
          onChange={(e) => setPokemonName(e.target.value)}
          x-webkit-speech="true"
        />
        <button onClick={fetchCards}>Go</button>
        {cards?.length > 0 && (
          <>
            <img
              src={cards[currentNumber].images?.small}
              style={{ height: "400px", width: "300px" }}
            />
            <br />
            <button
              disabled={currentNumber === 0}
              onClick={() => setCurrentNumber(currentNumber - 1)}
            >
              Back
            </button>
            <button
              disabled={currentNumber === cards.length - 1}
              onClick={() => setCurrentNumber(currentNumber + 1)}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
