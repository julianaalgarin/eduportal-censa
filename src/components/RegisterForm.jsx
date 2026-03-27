import { useState } from 'react'
import FormField from './FormField'
import SuccessMessage from './SuccessMessage'

const INITIAL_FORM = {
    nombre: '',
    correo: '',
    programa: '',
    password: '',
}

function RegisterForm() {
    const [formData, setFormData] = useState(INITIAL_FORM)
    const [errors, setErrors] = useState({})
    const [submittedUser, setSubmittedUser] = useState(null)

    const validateField = (name, value) => {
        switch (name) {
            case 'nombre':
                if (!value.trim()) return 'El nombre es obligatorio.'
                if (value.trim().length < 3) {
                    return 'Debe tener al menos 3 caracteres.'
                }
                return ''

            case 'correo': {
                if (!value.trim()) return 'El correo es obligatorio.'
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(value)) {
                    return 'Ingrese un correo valido.'
                }
                return ''
            }

            case 'programa':
                if (!value.trim()) return 'El programa es obligatorio.'
                return ''

            case 'password':
                if (!value.trim()) return 'La contraseña es obligatoria.'
                if (value.length < 6) {
                    return 'Debe tener al menos 6 caracteres.'
                }
                return ''

            default:
                return ''
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))

        setErrors((previous) => ({
            ...previous,
            [name]: validateField(name, value),
        }))
    }

    const validateForm = () => {
        const nextErrors = {}

        for (const [name, value] of Object.entries(formData)) {
            nextErrors[name] = validateField(name, value)
        }

        setErrors(nextErrors)
        return Object.values(nextErrors).every((error) => !error)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        setSubmittedUser(formData)
    }

    const handleReset = () => {
        setFormData(INITIAL_FORM)
        setErrors({})
        setSubmittedUser(null)
    }

    if (submittedUser) {
        return <SuccessMessage user={submittedUser} onReset={handleReset} />
    }

    return (
        <form className="register-form" onSubmit={handleSubmit} noValidate>
            <FormField
                label="Nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                error={errors.nombre}
                placeholder="Escribe tu nombre"
            />

            <FormField
                label="Correo"
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                error={errors.correo}
                placeholder="correo@ejemplo.com"
            />

            <FormField
                label="Programa"
                name="programa"
                value={formData.programa}
                onChange={handleChange}
                error={errors.programa}
                placeholder="Nombre del programa"
            />

            <FormField
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Minimo 6 caracteres"
            />

            <button type="submit">Registrar</button>
        </form>
    )
}

export default RegisterForm