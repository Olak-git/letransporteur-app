import * as Icon from 'lucide-react'
import { CSSProperties } from 'react';

export const NotificationIcon = ({
    size,
    className
} : {
    size?: number,
    className?: string
}) => {
    return (
        // <svg xmlns="http://www.w3.org/2000/svg" display="inline-flex" height={size||20} width={size||20} className={className} aria-label="notification" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.24889 8.04981C7.49299 5.60886 9.547 3.75 12.0001 3.75C14.4533 3.75 16.5073 5.60886 16.7514 8.04981L17.0356 10.8923V10.8923C17.0754 11.2904 17.0982 11.5183 17.1327 11.744C17.2815 12.7164 17.5932 13.6567 18.0546 14.5254C18.1617 14.727 18.2795 14.9234 18.4853 15.2663L18.4853 15.2664L18.9031 15.9627C19.1487 16.372 19.3054 16.6347 19.4021 16.8354C19.4624 16.9605 19.4776 17.0197 19.4813 17.0366C19.4722 17.098 19.4405 17.1539 19.3925 17.1933C19.3762 17.1988 19.3176 17.2162 19.1793 17.2289C18.9574 17.2492 18.6515 17.25 18.1742 17.25H15H9H5.82604C5.34874 17.25 5.04282 17.2492 4.82097 17.2289C4.68266 17.2162 4.62407 17.1988 4.60773 17.1933C4.55973 17.1539 4.52809 17.098 4.51901 17.0366C4.52267 17.0197 4.53789 16.9605 4.59817 16.8354C4.69485 16.6347 4.8516 16.372 5.09717 15.9627L5.51488 15.2665C5.7207 14.9235 5.83855 14.7271 5.94565 14.5254C6.4071 13.6567 6.71876 12.7164 6.86752 11.744C6.90205 11.5183 6.92484 11.2904 6.96464 10.8924L7.24889 8.04981ZM8.32501 18.75H5.79186H5.79183C5.35862 18.75 4.98276 18.75 4.68393 18.7226C4.38205 18.6949 4.03133 18.6314 3.73057 18.4106C3.32749 18.1146 3.07029 17.6603 3.02388 17.1624C2.98925 16.7909 3.11523 16.4575 3.2468 16.1844C3.37704 15.914 3.57043 15.5917 3.79333 15.2203L4.21683 14.5144C4.43765 14.1464 4.53435 13.9848 4.62093 13.8218C5.00328 13.102 5.26152 12.3228 5.38478 11.5172C5.41269 11.3347 5.43166 11.1473 5.47437 10.7202L5.75634 7.90056C6.07711 4.6928 8.77638 2.25 12.0001 2.25C15.2239 2.25 17.9232 4.6928 18.2439 7.90056L18.5259 10.7202C18.5686 11.1473 18.5876 11.3347 18.6155 11.5172C18.7387 12.3228 18.997 13.102 19.3793 13.8218C19.4659 13.9848 19.5626 14.1464 19.7834 14.5144L20.207 15.2203L20.207 15.2204C20.4299 15.5918 20.6232 15.9141 20.7535 16.1844C20.885 16.4575 21.011 16.7909 20.9764 17.1624C20.93 17.6603 20.6728 18.1146 20.2697 18.4106C19.9689 18.6314 19.6182 18.6949 19.3163 18.7226C19.0175 18.75 18.6417 18.75 18.2084 18.75H18.2084H15.675C15.3275 20.4617 13.8142 21.75 12 21.75C10.1858 21.75 8.67247 20.4617 8.32501 18.75ZM14.122 18.75C13.8131 19.6239 12.9797 20.25 12 20.25C11.0203 20.25 10.1869 19.6239 9.87803 18.75H14.122Z" fill="currentColor" fill-opacity="0.87"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" display="inline-flex" height={size||20} width={size||20} className={className} aria-label="notification" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M7.24889 8.04981C7.49299 5.60886 9.547 3.75 12.0001 3.75C14.4533 3.75 16.5073 5.60886 16.7514 8.04981L17.0356 10.8923V10.8923C17.0754 11.2904 17.0982 11.5183 17.1327 11.744C17.2815 12.7164 17.5932 13.6567 18.0546 14.5254C18.1617 14.727 18.2795 14.9234 18.4853 15.2663L18.4853 15.2664L18.9031 15.9627C19.1487 16.372 19.3054 16.6347 19.4021 16.8354C19.4624 16.9605 19.4776 17.0197 19.4813 17.0366C19.4722 17.098 19.4405 17.1539 19.3925 17.1933C19.3762 17.1988 19.3176 17.2162 19.1793 17.2289C18.9574 17.2492 18.6515 17.25 18.1742 17.25H15H9H5.82604C5.34874 17.25 5.04282 17.2492 4.82097 17.2289C4.68266 17.2162 4.62407 17.1988 4.60773 17.1933C4.55973 17.1539 4.52809 17.098 4.51901 17.0366C4.52267 17.0197 4.53789 16.9605 4.59817 16.8354C4.69485 16.6347 4.8516 16.372 5.09717 15.9627L5.51488 15.2665C5.7207 14.9235 5.83855 14.7271 5.94565 14.5254C6.4071 13.6567 6.71876 12.7164 6.86752 11.744C6.90205 11.5183 6.92484 11.2904 6.96464 10.8924L7.24889 8.04981ZM8.32501 18.75H5.79186H5.79183C5.35862 18.75 4.98276 18.75 4.68393 18.7226C4.38205 18.6949 4.03133 18.6314 3.73057 18.4106C3.32749 18.1146 3.07029 17.6603 3.02388 17.1624C2.98925 16.7909 3.11523 16.4575 3.2468 16.1844C3.37704 15.914 3.57043 15.5917 3.79333 15.2203L4.21683 14.5144C4.43765 14.1464 4.53435 13.9848 4.62093 13.8218C5.00328 13.102 5.26152 12.3228 5.38478 11.5172C5.41269 11.3347 5.43166 11.1473 5.47437 10.7202L5.75634 7.90056C6.07711 4.6928 8.77638 2.25 12.0001 2.25C15.2239 2.25 17.9232 4.6928 18.2439 7.90056L18.5259 10.7202C18.5686 11.1473 18.5876 11.3347 18.6155 11.5172C18.7387 12.3228 18.997 13.102 19.3793 13.8218C19.4659 13.9848 19.5626 14.1464 19.7834 14.5144L20.207 15.2203L20.207 15.2204C20.4299 15.5918 20.6232 15.9141 20.7535 16.1844C20.885 16.4575 21.011 16.7909 20.9764 17.1624C20.93 17.6603 20.6728 18.1146 20.2697 18.4106C19.9689 18.6314 19.6182 18.6949 19.3163 18.7226C19.0175 18.75 18.6417 18.75 18.2084 18.75H18.2084H15.675C15.3275 20.4617 13.8142 21.75 12 21.75C10.1858 21.75 8.67247 20.4617 8.32501 18.75ZM14.122 18.75C13.8131 19.6239 12.9797 20.25 12 20.25C11.0203 20.25 10.1869 19.6239 9.87803 18.75H14.122Z" fill="currentColor" fillOpacity="0.87"></path></svg>
    )
}

export default Icon;