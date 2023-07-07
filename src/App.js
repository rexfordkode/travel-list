import { useState } from "react"

const App = () => {
  const [items, setItems] = useState([])

  const handleAddItems = (item) => {
    setItems((items) => [...items, item])
  }

  const handleDeleteItem = (id) => {
    console.log(id)
    setItems((items) => items.filter((item) => item.id !== id))
  }

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  )
}

const Logo = () => {
  return <h1>🌴 Far Away 💼</h1>
}

const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description) return

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    }

    onAddItems(newItem)

    setDescription("")
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select
        name=""
        id=""
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value))
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

const PackingList = ({ items, onDeleteItem, onToggleItem }) => {
  return (
    <div className="list">
      <li>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </li>
    </div>
  )
}

const Stats = () => {
  return (
    <footer className="stats">
      <em> 💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  )
}

const Item = ({ item, onDeleteItem, onToggleItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={onDeleteItem}>❌</button>
    </li>
  )
}

export default App
