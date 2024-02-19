import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((item) => id !== item.id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggle={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItem(newItem);

    setDescription("");
    setQuantity("");
  }
  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          placeholder="item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
function PackingList({ items, onDeleteItem, onToggle }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed x</em>
    </footer>
  );
}
