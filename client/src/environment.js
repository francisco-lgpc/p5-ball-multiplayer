function getEnvironment() {
  if (window.location.hostname === 'localhost') {
    return { production: false }
  } else {
    return { production: true }
  }
}

const ENV = getEnvironment()
