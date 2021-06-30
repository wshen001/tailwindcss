import transformThemeValue from '../util/transformThemeValue'

let transformValue = transformThemeValue('boxShadow')
let defaultBoxShadow = [
  `var(--tw-ring-offset-shadow, 0 0 #0000)`,
  `var(--tw-ring-shadow, 0 0 #0000)`,
  `var(--tw-shadow)`,
].join(', ')

export default function () {
  return function ({ config, matchUtilities, addBase, addUtilities, theme, variants }) {
    if (config('mode') === 'jit') {
      addBase({
        '*::tailwind': {
          '--tw-shadow': '0 0 #0000',
        },
      })
    } else {
      addUtilities(
        {
          '*, ::before, ::after': {
            '--tw-shadow': '0 0 #0000',
          },
        },
        { respectImportant: false }
      )
    }

    matchUtilities(
      {
        shadow: (value) => {
          value = transformValue(value)

          return {
            '--tw-shadow': value === 'none' ? '0 0 #0000' : value,
            'box-shadow': defaultBoxShadow,
          }
        },
      },
      {
        values: theme('boxShadow'),
        variants: variants('boxShadow'),
        type: 'lookup',
      }
    )
  }
}
