import React from 'react';
import { Form, FormField } from '../Form/Form';

interface RegisterFormProps {
    onSubmit: (email: string, password: string, firstName: string, lastName: string) => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
    const handleSubmit = (formData: Record<string, string>) => {
        onSubmit(formData.email, formData.password, formData.firstName, formData.lastName);
    };

    return (
        <Form onSubmit={handleSubmit} submitButtonText="Register">
            <FormField name="firstName" label="First Name" type="text" required />
            <FormField name="lastName" label="Last Name" type="text" required />
            <FormField name="email" label="Email" type="email" required />
            <FormField name="password" label="Password" type="password" required />
        </Form>
    );
}