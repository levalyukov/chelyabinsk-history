import "../../styles/landing/Start.css"

interface ComponentProps {onChangePage: (page: "landing" | "all-tours") => void;};

function Start({onChangePage}: ComponentProps) {
  return (
    <section id="start">
      <h1>Погрузитесь в историю: все экскурсии и фильмы в одном месте</h1>
      <p></p>
      <button onClick={() => onChangePage("all-tours")}>button</button>
    </section>
  );
};

export default Start;