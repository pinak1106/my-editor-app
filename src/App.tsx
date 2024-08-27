import { Link } from "react-router-dom";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Editor App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/tinymce">TinyMCE Editor</Link>
          </li>
          <li>
            <Link to="/tiptap">TipTap Editor</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
