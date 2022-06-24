import FormData from 'form-data'

export const convertToFormData = <D>(d: D): FormData => {
  const formData = new FormData()

  Object.entries(d).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return formData
}
