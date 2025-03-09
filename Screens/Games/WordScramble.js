import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const words = [
    'HOUSE', 'FAMILY', 'FRIEND', 'LOVE', 'HAPPY', 'SAD', 'MOM', 'DAD', 'FOOD', 'DRINK', 'WATER', 'MONEY', 'JOB', 
    'WORK', 'SCHOOL', 'STUDY', 'BOOK', 'PAPER', 'PENCIL', 'TEACHER', 'STUDENT', 'CLASS', 'BRAIN', 'KNOWLEDGE', 
    'LEARNING', 'SLEEP', 'WAKE', 'ALARM', 'SUN', 'MOON', 'STAR', 'EARTH', 'SKY', 'CLOUD', 'RAIN', 'SNOW', 'WIND', 
    'FLOOD', 'HURRICANE', 'VACCINE', 'HEALTH', 'SICK', 'HOSPITAL', 'COLD', 'FEVER', 'VITAMINS', 'BATH', 'CLEAN', 
    'DIRTY', 'SHOWER', 'TOOTHBRUSH', 'SOAP', 'TOWEL', 'SHAMPOO', 'CLOTHES', 'SHOES', 'SUNGLASSES', 'JACKET', 'HAT', 
    'COMPUTER', 'MOUSE', 'KEYBOARD', 'SCREEN', 'PHONE', 'CALL', 'TEXT', 'EMAIL', 'POST', 'LETTER', 'ADDRESS', 
    'STREET', 'CITY', 'COUNTRY', 'TRAVEL', 'AIRPORT', 'TRAIN', 'BUS', 'CAR', 'BICYCLE', 'ROAD', 'SIGN', 'PARK', 
    'GARDEN', 'NATURE', 'PARKING', 'CASH', 'CREDIT', 'DEBIT', 'SHOP', 'STORE', 'MALL', 'MARKET', 'GROCERY', 
    'SUPERMARKET', 'LUNCH', 'DINNER', 'BREAKFAST', 'SNACK', 'MOVIE', 'MUSIC', 'SONG', 'DANCE', 'PICTURE'
]


const WordScramble = () => {
    const navigation = useNavigation();
    const [word, setWord] = useState(getRandomWord());
    const [scrambledWord, setScrambledWord] = useState(scrambleWord(word));
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [score, setScore] = useState(0);

    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    function scrambleWord(word) {
        return word.split('').sort(() => Math.random() - 0.5).join('');
    }

    const checkAnswer = () => {
        if (input.toUpperCase() === word) {
            setMessage('Correct!');
            setScore(score + 1);
            setTimeout(() => {
                setNewWord();
            }, 1000);
        } else {
            setMessage(`Try Again! The correct word was ${word}`);
            setScore(score - 1);
            setAttempts(attempts + 1);
            setTimeout(() => {
                setNewWord();
            }, 2000);
        }
    };

    const setNewWord = () => {
        const newWord = getRandomWord();
        setWord(newWord);
        setScrambledWord(scrambleWord(newWord));
        setInput('');
        setMessage('');
        setAttempts(0);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="green" />
            </TouchableOpacity>
            <Text style={styles.title}>Word Scramble Game</Text>
            <Text style={styles.scrambledWord}>{scrambledWord}</Text>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Unscramble the word"
            />
            <Button title="Check" onPress={checkAnswer} color="green" />
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Text style={styles.score}>Score: {score}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'green',
    },
    scrambledWord: {
        fontSize: 32,
        marginBottom: 20,
        color: 'green',
    },
    input: {
        height: 40,
        borderColor: 'green',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%',
    },
    message: {
        fontSize: 18,
        marginTop: 20,
        color: 'green',
    },
    score: {
        fontSize: 18,
        marginTop: 20,
        color: 'green',
    },
});

export default WordScramble;
