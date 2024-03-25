import React, { useState } from 'react';
import ClientForm from './ClientForm';
import FreelancerForm from './FreelancerForm';

function MainForm() {
    const [showClientForm, setShowClientForm] = useState(true); // 初始显示ClientForm

    const handleToggleForm = () => {
        setShowClientForm(prevState => !prevState); // 切换显示表单的状态
    };

    return (
        <div>
            {showClientForm ? (
                <ClientForm onToggleForm={handleToggleForm} />
            ) : (
                <FreelancerForm onToggleForm={handleToggleForm} />
            )}
        </div>
    );
}

export default MainForm;

