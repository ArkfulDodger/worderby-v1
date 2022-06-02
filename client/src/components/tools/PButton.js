"use strict";

import React, { Component } from "react";
import { View, Pressable, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import GText from "./GText";

export default class PButton extends Component {
  constructor(props) {
    super(props);
    // Put your default font styles here.
    this.style = [
      {
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
      },
    ];
    if (props.style) {
      if (Array.isArray(props.style)) {
        this.style = this.style.concat(props.style);
      } else {
        this.style.push(props.style);
      }
    }
  }

  render() {
    return (
      <LinearGradient
        colors={[
          this.props.color1 || "#FFF8E8",
          this.props.color2 || "#FFE298",
        ]}
        // colors={["#FFFFFF", "#FFAD83"]}
        style={[
          { borderRadius: 10 },
          this.props.style && this.props.style.width
            ? { width: this.props.style.width }
            : null,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Pressable {...this.props} style={this.style}>
          <GText
            style={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {this.props.children}
          </GText>
        </Pressable>
      </LinearGradient>
    );
  }
}
