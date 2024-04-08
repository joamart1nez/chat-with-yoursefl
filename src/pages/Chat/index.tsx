import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonTextarea,
} from "@ionic/react";
import { sendSharp } from "ionicons/icons";
import "./styles.css";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

interface ChatMessage {
  currentPerson: string;
  message: string;
}

type Messages = ChatMessage[];

const Chat: React.FC = () => {
  const person1 = "Joaquin";
  const person2 = "Mariano";

  const messagesEndRef = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Messages>([
    { currentPerson: person1, message: "Hola mami" },
    { currentPerson: person2, message: "yo no soy tu mmai imbecil" },
    { currentPerson: person1, message: "Hola mami" },
    { currentPerson: person2, message: "yo no soy tu mmai imbecil" },
    { currentPerson: person1, message: "Hola mami" },
    { currentPerson: person2, message: "yo no soy tu mmai imbecil" },
    { currentPerson: person1, message: "Hola mami" },
    { currentPerson: person2, message: "yo no soy tu mmai imbecil" },
    { currentPerson: person1, message: "Hola mami" },
    { currentPerson: person2, message: "yo no soy tu mmai imbecil" },
  ]);
  const [currentPerson, setCurrentPerson] = useState(person1);

  const changePerson = () =>
    setCurrentPerson((prev) => (prev === person1 ? person2 : person1));

  const addMessage = (message: string) => {
    if (!message) return;

    setMessages((prev: Messages) => [...prev, { message, currentPerson }]);
    changePerson();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nombre chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {messages.map(({ currentPerson, message }) => {
          const isFirst = currentPerson == person1;

          return (
            <div style={{ clear: "both" }}>
              <div
                className={`chat-message-box ${
                  isFirst ? "ion-float-right" : "ion-float-left"
                }`}
                style={{
                  backgroundColor: isFirst
                    ? "var(--ion-color-primary)"
                    : "var(--ion-color-secondary)",
                }}
              >
                <p
                  style={{
                    color: "white",
                    margin: 0,
                    padding: "5px 10px",
                  }}
                >
                  {message}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonTextarea
                  value={message}
                  onIonChange={(e) => addMessage(e.target.value || "")}
                  placeholder="Escribe un mensaje"
                  rows={1}
                  autoGrow={true}
                />
              </IonCol>
              <IonCol size="2">
                <IonButton>
                  <IonIcon icon={sendSharp} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;
