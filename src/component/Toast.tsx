import React from 'react'
import { Animated, Easing, StyleSheet, Text } from 'react-native'

const formatStringOrError = (content: string | Error) => {
  return content instanceof Error
    ? `[${content.name}] ${content.message}`
    : content
}

const ANIMATION_DURATION = 150

export class Toast extends React.Component<any, any> {
  static instance: Toast
  opacity = new Animated.Value(0)
  timeout: NodeJS.Timeout | null = null

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      text: '',
    }
    Toast.instance = this
  }

  static show(content: string | Error, duration: number = 3000) {
    Toast.instance._show(formatStringOrError(content), duration)
  }

  _show(text: string, duration: number) {
    if (this.timeout) clearTimeout(this.timeout)
    this.setState({ visible: true, text })
    Animated.timing(this.opacity, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.linear),
      useNativeDriver: true,
    }).start()
    setTimeout(() => {
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.linear),
        useNativeDriver: true,
      }).start()
      this.timeout = setTimeout(() => {
        this.setState({ visible: false, text: '' })
        this.timeout = null
      }, ANIMATION_DURATION)
    }, duration)
  }

  render() {
    const { visible, text } = this.state
    if (!visible) return null
    return (
      <Animated.View style={[styles.layout, { opacity: this.opacity }]}>
        <Text style={styles.toastText}>{text}</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    bottom: '15%',
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
  },
  toastText: {
    color: '#fff',
  },
})
