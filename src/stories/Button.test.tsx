import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button label="Default Button" />)

    const button = screen.getByRole('button', { name: /default button/i })
    expect(button).not.toBeNull()
    expect(button.getAttribute('class')).toContain('storybook-button')
    expect(button.getAttribute('class')).toContain('storybook-button--medium')
    expect(button.getAttribute('class')).toContain(
      'storybook-button--secondary',
    )
  })

  it('applies the "primary" class when primary is true', () => {
    render(<Button label="Primary Button" primary />)

    const button = screen.getByRole('button', { name: /primary button/i })
    expect(button.getAttribute('class')).toContain('storybook-button--primary')
  })

  it('applies the correct size class', () => {
    const sizes: Array<'small' | 'medium' | 'large'> = [
      'small',
      'medium',
      'large',
    ]

    sizes.forEach((size) => {
      render(<Button label={`Button ${size}`} size={size} />)
      const button = screen.getByRole('button', { name: new RegExp(size, 'i') })
      expect(button.getAttribute('class')).toContain(
        `storybook-button--${size}`,
      )
    })
  })

  it('applies the backgroundColor style', () => {
    render(<Button label="Custom Color" backgroundColor="red" />)

    const button = screen.getByRole('button', { name: /custom color/i })
    expect(button.style.backgroundColor).toBe('red')
  })

  it('calls the onClick handler when clicked', () => {
    const onClickMock = vi.fn()
    render(<Button label="Clickable" onClick={onClickMock} />)

    const button = screen.getByRole('button', { name: /clickable/i })
    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
