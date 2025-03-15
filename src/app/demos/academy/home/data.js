import { FaBookReader, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import element1 from '@/assets/images/element/abc.svg';
import element2 from '@/assets/images/element/lego.svg';
import element3 from '@/assets/images/element/sport.svg';
import element4 from '@/assets/images/element/song.svg';
import elem1 from '@/assets/images/element/online-session.svg';
import elem2 from '@/assets/images/element/one-to-one.svg';
import elem3 from '@/assets/images/element/test-series.svg';
import elem4 from '@/assets/images/element/toppers-study.svg';
export const counterData = [{
  title: 'Total Students',
  count: 1,
  icon: FaUserGraduate,
  variant: 'text-info',
  suffix: 'K'
}, {
  title: 'Total Instructors',
  count: 105,
  icon: FaChalkboardTeacher,
  variant: 'text-purple'
}, {
  title: 'Total Activities',
  count: 2,
  icon: FaBookReader,
  variant: 'text-danger',
  suffix: 'K+'
}];
export const offerCourses = [{
  image: elem1,
  title: 'Online Sessions',
  description: 'Join our dynamic online sessions for interactive learning. Experience live lectures, real-time interaction, and collaborative activities to master competitive exams.',
}, {
  image: elem3,
  title: 'Test Series',
  description: 'Designed to assess your knowledge and identify areas for improvement, these tests simulate competitive examination challenges, providing valuable insights to enhance your proficiency.',
}, {
  image: elem2,
  title: '1 to 1 Mentorship',
  description: 'Elevate your learning experience with personalized guidance from experienced mentors. Our one-to-one mentorship program offers individualized support, addressing your specific learning needs ',
}, {
  image: elem4,
  title: "Topper's Study Material",
  description: "Unlock top-performer insights with our exclusive study materials. Our toppers' resources offer a comprehensive and effective guide to enhance your understanding of  and excel in your studies",
}];
