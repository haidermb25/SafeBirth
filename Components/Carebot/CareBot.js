import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { QueryBot } from "../../Api/CareBot";

const CareBot = () => {
  const [messages, setMessages] = useState([{ text: "Hi! Ask me anything about pregnancy...", sender: "bot" }]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    setInput(""); // Clear input field

    try {
      // Fetch bot response asynchronously
      const botReply = await QueryBot(input);
      if(!botReply){

      }
      const botResponse = { text: botReply.data.response.text, sender: "bot" };

      // Update messages with the bot response
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5", marginTop: 50}}>
      <ScrollView style={{ flex: 1, padding: 16 }} showsVerticalScrollIndicator={false}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#008000" : "#E0E0E0",
              padding: 12,
              marginVertical: 2,
              borderRadius: 16,
              maxWidth: "75%",
              marginBottom:10
            }}
          >
            <Text style={{ color: msg.sender === "user" ? "#FFF" : "#000" }}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 12, backgroundColor: "#FFF", borderTopWidth: 1, borderColor: "#ddd" }}>
        <TextInput
          style={{ flex: 1, backgroundColor: "#F0F0F0", padding: 10, borderRadius: 20 }}
          placeholder="Type a question..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleSend} disabled={!input.trim()}>
          <IconButton icon="send" color="#6200ea" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CareBot;
