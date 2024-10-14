import React from 'react';
import { Form, FormField } from '../Shared/Form/Form';

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const handleSubmit = (formData: Record<string, string>) => {
        onSubmit(formData.email, formData.password);
    };

    return (
        <Form onSubmit={handleSubmit} submitButtonText="Log In">
            <FormField name="email" label="Email" type="email" required />
            <FormField name="password" label="Password" type="password" required />
        </Form>
    );
}