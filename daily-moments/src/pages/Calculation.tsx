import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSlides, IonSlide, IonItem, IonLabel, IonButton, IonButtons, IonIcon, IonRow, IonCol, IonInput } from '@ionic/react';
import { useAuthInit } from '../auth';
import { useParams, useHistory } from 'react-router';
import { close as closeIcon } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import Scribble from '../components/Scribble';

interface RouteParams {
  level: string;
  type: string;
  subLevel: string;
}
const Calculation:React.FC= () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mnist/model.json');
      setModel(loadedModel);
    };
    loadModel();
  }, []);
  const {auth} = useAuthInit();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [items, setItems] = useState([]);
  const { type, level, subLevel } = useParams<RouteParams>();
  const history =  useHistory();
  const handleBack = () => {
    history.goBack();
  }
  const levels = {
    'easy': 3,
    'medium': 5,
    'hard': 7,
    'expert': 9
  }
  const typeConst = {
    'addition': '+',
    'subtraction': '-',
    'multiplication': '*',
    'division': '%'
  }
  useEffect(() => {
    generateQuestions(type, levels[level], subLevel);
  }, [type, level, subLevel])
  // Generate questions for each sublevel
const generateQuestions = (type, level, subLevel) => {
  let questions = [];
  for (let i = 0; i < 10; i++) {
    let question = {};
    switch (type) {
      case 'addition':
        // Generate addition questions for difficulty level 1
        question = generateAdditionQuestion(level, subLevel);
        break;
      case 'subtraction':
        // Generate subtraction questions for difficulty level 2
        question = generateSubtractionQuestion(level, subLevel);
        break;
      case 'multiplication':
        // Generate multiplication questions for difficulty level 3
        question = generateMultiplicationQuestion(level, subLevel);
        break;
      case 'division':
        // Generate division questions for difficulty level 4
        question = generateDivisionQuestion(level, subLevel);
        break;
      default:
        break;
    }
    questions.push(question);
  }
  console.log('questions', questions);
  setItems(questions);
};

// Generate addition question
const generateAdditionQuestion = (level, subLevel) => {
  let num1 = getRandomNumber(level, subLevel);
  let num2 = getRandomNumber(level, subLevel);
  let answer = num1 + num2;
  return {
    num1,
    num2,
    answer
  };
};

// Generate subtraction question
const generateSubtractionQuestion = (level, subLevel) => {
  let num1 = getRandomNumber(level, subLevel);
  let num2 = getRandomNumber(level, subLevel);
  if (num2 > num1) {
    [num1, num2] = [num2, num1];
  }
  let answer = num1 - num2;
  return {
    num1,
    num2,
    answer
  };
};

// Generate multiplication question
const generateMultiplicationQuestion = (level, subLevel) => {
  let num1 = getRandomNumber(level, subLevel);
  let num2 = getRandomNumber(level, subLevel);
  let answer = num1 * num2;
  return {
    num1,
    num2,
    answer
  };
};

// Generate division question
const generateDivisionQuestion = (level, subLevel) => {
  let num1 = getRandomNumber(level, subLevel);
  let num2 = getRandomNumber(level, subLevel);
  if (num2 > num1) {
    [num1, num2] = [num2, num1];
  }
  let answer = num1 / num2;
  return {
    num1,
    num2,
    answer
  };
};

// Get random number for a given sublevel
const getRandomNumber = (level, subLevel) => {
  let max = level * subLevel * 3;
  let min = level * subLevel * 2;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Update leaderboard
const updateLeaderboard = (username, score) => {
  let leaderboard = [];
  // Check if username already exists in leaderboard
  let userExists = false;
  for (let i = 0; i < leaderboard.length; i++) {
    if (leaderboard[i].username === username) {
      // Update user's score if it's higher
      if (leaderboard[i].score < score) {
        leaderboard[i].score = score;
      }
      userExists = true;
      break;
    }
  }
  if (!userExists) {
    leaderboard.push({ username, score });
    }
    // Sort leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);
    return leaderboard;
  };
  // Add new user to leaderboard if it doesn't exist

  const handleCheckAnswer = (type) => {
    let result;
    switch (type) {
      case 'addition':
        result =  String(items[currentIndex].num1 + items[currentIndex].num2);
        break;
      case 'subtraction':
        result = String(items[currentIndex].num1 - items[currentIndex].num2);
        break;
      case 'multiplication':
        result =  String(items[currentIndex].num1 * items[currentIndex].num2);
        break;
      case 'division':
        result =  String(items[currentIndex].num1 / items[currentIndex].num2);
        break;
      default:
        result = 'Invalid Operation';
        break;
    }
    if (userAnswer === result) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setUserAnswer("");
    setIsCorrect(false);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonItem>
              <IonLabel>{type}</IonLabel>
              <IonLabel>{level}</IonLabel>
              <IonButtons slot='end'>
                <IonButton onClick={handleBack}>
                  <IonIcon icon={closeIcon} slot="icon-only" />
                </IonButton>
              </IonButtons>
            </IonItem>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>{items[currentIndex]?.num1}</IonLabel>
          <IonLabel> {typeConst[type]}</IonLabel>
          <IonLabel>{items[currentIndex]?.num2}</IonLabel>
        </IonItem>
        <IonItem>
          <IonInput type="number" placeholder="Enter answer" value={userAnswer} onIonChange={e => setUserAnswer(String(e.target.value))} />
        </IonItem>
        <IonItem>
          <Scribble />
        </IonItem>
        <IonButton onClick={() => handleCheckAnswer(type)}>Check Answer</IonButton>
        {isCorrect && currentIndex !== items.length - 1 && (
          <IonButton onClick={handleNextQuestion}>Next Question</IonButton>
        )}
        {isCorrect && currentIndex === items.length - 1 && (
          <IonLabel>Congratulations, you have completed the quiz!</IonLabel>
        )}
        {!isCorrect && (
          <IonLabel>Incorrect, please try again.</IonLabel>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Calculation;
