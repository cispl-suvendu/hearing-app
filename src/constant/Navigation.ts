import { MdOutlineDashboard } from "react-icons/md";
import { TbBrandCodecov } from "react-icons/tb";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { RiGraduationCapLine } from "react-icons/ri";




export const MainNavLink = [
    {
        label: 'Dashboard',
        icon: MdOutlineDashboard,
        link:'/dashboard'
    },
    {
        label: 'Categories',
        icon: TbBrandCodecov,
        link:'/categories'
    },
    {
        label: 'Questionnaire',
        icon: TbMessageCircleQuestion,
        link:'/questionnaires'
    },
    {
        label: 'Exams',
        icon: RiGraduationCapLine,
        link:'/exams'
    }
]