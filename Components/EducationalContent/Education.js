import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

const EducationCard = ({
  contentid,
  titleContent,
  textContent,
  videoSource,
}) => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
    player.play;
  });

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{titleContent}</Text>

        {/* Render video if videoSource is provided */}
        {videoSource ? (
          <VideoView
            player={player}
            source={{ uri: videoSource }}
            style={styles.video} // Applying styles from the StyleSheet
            allowsFullscreen
            allowsPictureInPicture
          />
        ) : null}

        {/* Render text content if textContent is provided */}
        {textContent ? (
          <Text style={styles.textContent}>{textContent}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 8,
    margin: 15,
    padding: 20,
    overflow: "hidden",
    width: 320,
    alignSelf: "center",
    backgroundColor: "#f9f9f9", // Subtle background for the card
    borderWidth: 1,
    borderColor: "#e0e0e0", // Soft border color
  },
  content: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  textContent: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginTop: 10,
  },
  video: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginVertical: 15,
    alignSelf: "center",
    backgroundColor: "#388E3C",
    borderWidth: 2,
    borderColor: "#2C6B2F", // Darker green for the border
    shadowColor: "#388E3C",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 6,
  },
});

export default EducationCard;
