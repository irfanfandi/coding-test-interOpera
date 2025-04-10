import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-gray-50 h-screen">
      <Component {...pageProps} />
    </div>
  );
}
