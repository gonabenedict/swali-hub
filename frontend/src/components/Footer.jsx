import React from 'react'
import { footerStyles } from '../assets/dummystyles'

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <p className={footerStyles.text}>
          Developed by <span className={footerStyles.highlight}>Gona Technologies</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
