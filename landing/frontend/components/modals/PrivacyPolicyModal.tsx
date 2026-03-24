import "../../styles/modals/modal.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function PrivacyPolicyModal({setModalVisible}: {
  setModalVisible: (state:boolean) => void
}):React.ReactNode {
  return (
    <div className="modal-background">
      <div className="modal">
        <nav className="modal-header">
          <button onClick={() => setModalVisible(false)} className="modal-close">
            <span><FontAwesomeIcon icon={faXmark}/></span>
          </button>
        </nav>
        <div className="modal-content">
          <h2>Политика Конфиденциальности</h2>
          <div className="policy-container">
            <p>Настоящая политика описывает, как обрабатываются данные в приложении. Приложение разработано в учебных целях и не собирает, не хранит и не передаёт ваши персональные данные.</p>

            <p><b>1. Хранение данных</b></p>
            <p>Все данные, создаваемые вами (например, избранные места, настройки), сохраняются исключительно на вашем устройстве (локальное хранилище браузера). Мы не отправляем эти данные на наши серверы и не имеем к ним доступа.</p>

            <p><b>2. Использование базы данных</b></p>
            <p>Внешняя база данных используется только для загрузки готовых материалов (репортажей, статей о достопримечательностях). Эти материалы не содержат персональных данных и не могут быть изменены вами. Ваши личные данные в базу не передаются.</p>

            <p><b>3. Геолокация</b></p>
            <p>Приложение может запрашивать ваше местоположение через встроенный Geolocation API браузера. Это происходит только на вашем устройстве; координаты никуда не передаются и не сохраняются на сервере. Вы можете отозвать разрешение в любой момент через настройки браузера.</p>

            <p><b>4. Контакты</b></p>
            <p>Если у вас есть вопросы, вы можете сообщить о них через <a href="https://github.com/levalyukov/chelyabinsk-history/issues">GitHub Issues</a> репозитория проекта.</p>


            <p><i>Дата последнего обновления: 24 марта 2026 г.</i></p>
          </div>
        </div>
      </div>
    </div>
  );
};