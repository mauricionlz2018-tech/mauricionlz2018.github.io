import { useState, useRef, useMemo } from "react";

function Label(props) {
    return (
        <label className="block text-sm font-medium text-gray-700">
            {props.children}
        </label>
    );
}

function Input({props, ...rest}) {
    return (
        <input
            className="mt-2 block w-full rounded-lg p-4 border text-black border-gray-300 hover:border-purple-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            {...rest} 
        />
    );
}

function TextArea({props, ...rest}) {
    return (
        <textarea
            className="mt-2 block w-full rounded-lg p-5 border text-black border-gray-300 hover:border-purple-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            {...rest}
        />
    );
}

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzKSEiLrebdYS9lVRd1xGiG3vjVwNDTpczwUVRZDZOYoQLNhqvU87R_1LNvT_OZR-pAeQ/exec";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        const formData = {
            nombre: nameRef.current.value,
            correo: emailRef.current.value,
            descripcion: messageRef.current.value
        };

        // Validación básica
        if (!formData.nombre || !formData.correo || !formData.descripcion) {
            setStatus("Por favor completa todos los campos");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            setStatus("¡Mensaje enviado exitosamente!");
            
            nameRef.current.value = "";
            emailRef.current.value = "";
            messageRef.current.value = "";

        } catch (error) {
            console.error("Error:", error);
            setStatus("Error al enviar el mensaje. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
            
            setTimeout(() => setStatus(""), 2000);
        }
    };

    const SubmitButton = useMemo(() => {
        return (
            <button
                type="submit"
                className="mt-4 w-full bg-purple-950 hover:bg-purple-900 text-black py-3 rounded-lg transition font-semibold cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Enviando..." : "Enviar Mensaje"}
            </button>
        );
    }, [loading]);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-purple-950 mb-6">Formulario de Contacto</h2>
            
            <fieldset className="w-full flex flex-col gap-4" disabled={loading}>
                <div>
                    <Label>Nombre</Label>
                    <Input 
                        placeholder="Tu nombre completo" 
                        ref={nameRef}
                        type="text"
                        required
                    />
                </div>

                <div>
                    <Label>Correo Electrónico</Label>
                    <Input 
                        placeholder="tu@email.com" 
                        ref={emailRef}
                        type="email"
                        required
                    />
                </div>

                <div>
                    <Label>Mensaje</Label>
                    <TextArea 
                        placeholder="Escribe tu mensaje aquí..." 
                        rows={6} 
                        ref={messageRef}
                        required
                    />
                </div>

                {SubmitButton}

                {status && (
                    <div className={`mt-4 p-4 rounded-lg text-center font-medium ${
                        status.includes("exitosamente") 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                    }`}>
                        {status}
                    </div>
                )}
            </fieldset>

        </div>
    );
}