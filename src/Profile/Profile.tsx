import ProfileAdmin from './profile-admin.tsx';
import ProfilePatient from './profile-patient.tsx';
import ProfileDoctor from './profile-doctor.tsx'

export default function MyProfile({role})
{
    if(role==='Patient')
    {
        return <ProfilePatient/>;
    }
    else if(role==='Doctor')
    {
        return   <ProfileDoctor />;
    }
    else if (role==='Admin')
    {
        return <ProfileAdmin/>;
    }
}