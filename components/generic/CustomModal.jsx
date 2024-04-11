import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Animated, Modal, TouchableOpacity } from "react-native";


const SUPPORTED_ORIENTATIONS = [
  "portrait",
  "portrait-upside-down",
  "landscape",
  "landscape-left",
  "landscape-right"
];

class AlertPro extends Component {
  constructor() {
    super();
    this.innerRef = this.
    this.state = { visible: false };
    this.springValue = new Animated.Value(0);

    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  

  onCancel() {
    const { onCancel } = this.props;
    if (typeof onCancel === "function") onCancel();
  }

  onConfirm() {
    const { onConfirm } = this.props;
    if (typeof onConfirm === "function") onConfirm();
  }

  open() {
    const { useNativeDriver } = this.props;
    this.setState({ visible: true }, () => {
      Animated.spring(this.springValue, {
        toValue: 1,
        speed: 35,
        bounciness: 7,
        velocity: 15,
        useNativeDriver
      }).start();
    });
  }

  close() {
    const { onClose } = this.props;
    this.setState({ visible: false }, () => {
      this.springValue.setValue(0);
      if (typeof onClose === "function") onClose();
    });
  }

  render() {
    const {
      title,
      message,
      showCancel,
      showConfirm,
      textCancel,
      textConfirm,
      customStyles,
      closeOnPressMask,
      closeOnPressBack
    } = this.props;

    const { visible } = this.state;

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        onRequestClose={closeOnPressBack ? this.close : null}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeOnPressMask ? this.close : null}
          style={[customStyles.mask]}
        >
          <Animated.View
            style={[
              
              {
                transform: [{ scale: this.springValue }]
              },
              customStyles.container
            ]}
          >
            <TouchableOpacity activeOpacity={1}>
              <View >
                <Text>{title}</Text>
                {message ? (
                  <Text >{message}</Text>
                ) : null}
              </View>

              <View >
                {showCancel ? (
                  <TouchableOpacity
                    testID="buttonCancel"
                    onPress={this.onCancel}
                    style={[customStyles.buttonCancel]}
                  >
                    <Text >{textCancel}</Text>
                  </TouchableOpacity>
                ) : null}
                {showConfirm ? (
                  <TouchableOpacity
                    testID="buttonConfirm"
                    onPress={this.onConfirm}
                    style={[ customStyles.buttonConfirm]}
                  >
                    <Text >{textConfirm}</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

AlertPro.propTypes = {
  customStyles: PropTypes.objectOf(PropTypes.object),
  title: PropTypes.string,
  message: PropTypes.string,
  showCancel: PropTypes.bool,
  showConfirm: PropTypes.bool,
  textCancel: PropTypes.string,
  textConfirm: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  closeOnPressMask: PropTypes.bool,
  closeOnPressBack: PropTypes.bool,
  useNativeDriver: PropTypes.bool
};

AlertPro.defaultProps = {
  customStyles: {},
  title: "Do you want to continue?",
  message: "",
  showCancel: true,
  showConfirm: true,
  textCancel: "No",
  textConfirm: "Yes",
  closeOnPressMask: true,
  closeOnPressBack: true,
  useNativeDriver: false,
  onCancel: null,
  onConfirm: null,
  onClose: null
};

export default AlertPro;