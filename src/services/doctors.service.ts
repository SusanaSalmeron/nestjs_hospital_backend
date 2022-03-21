import { Injectable } from '@nestjs/common';
import { Doctor } from 'src/classes/doctor';

@Injectable()
export class DoctorsService {
    private readonly doctors: Doctor[] = [
        {
            id: 1,
            name: "Karly Sosa",
            email: "velit.eu.sem@ipsum.co.uk",
            speciality: "gynecology",
            photo: "https://images.pexels.com/photos/7580257/pexels-photo-7580257.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
            id: 2,
            name: "Indigo Trevino",
            email: "nec.eleifend@tempuslorem.net",
            speciality: "surgery",
            photo: "https://images.pexels.com/photos/6303556/pexels-photo-6303556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        }
    ]
    findAll(): Doctor[] {
        return this.doctors;
    }
}