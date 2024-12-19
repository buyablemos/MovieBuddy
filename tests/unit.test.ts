import axios from "axios";
import { describe, expect, test } from 'vitest';
import fetchTrailerId from "../src/findYTtrailer.ts";


describe('Unit Tests', () => {


    test('login test with correct password', async () => {

        const credentials = {
            username: 'admin',
            password: 'admin123'
        };

        // Zakładając, że serwer działa na danym adresie
        const url = `http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/login`;

        try {
            // Wysłanie zapytania POST do serwera
            const response = await axios.post(url, credentials);

            expect(response.status).toBe(201);
            expect(response.data.username).toBe('admin');
            expect(response.data.message).toBe('User login successfully!');
        } catch (error) {
            // Jeżeli wystąpi błąd, test powinien zawieść
            expect(error).toBeNull();
        }
    });

    test('login test with incorrect password', async () => {

        const credentials = {
            username: 'admin',
            password: 'admin'
        };
        const url = `http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/login`;
        try {
            const response = await axios.post(url, credentials);
            expect(response.status).toBe(400);
            expect(response.data.error).toBe('Invalid username or password.');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                expect(error.response?.status).toBe(400);
                expect(error.response?.data?.error).toBe('Invalid username or password.');
            } else {
                // Inny błąd
                console.error('Unexpected error: ', error);
                throw error;
            }
        }
    });



    test('downloading last ratings', async () => {

        try {
            //Uzytkownik 604 ma dużo ocen w bazie - 287
            const response = await axios.get(`http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/${604}/last-ratings`);
            const lastRatings = response.data.data;
            expect(response.status).toBe(200);
            expect(lastRatings).not.toBeNull();
            expect(lastRatings.length).toBe(287);
        } catch (error) {
            console.error('Unexpected error: ', error);
            throw error;
        }
    });

    interface Movie{
        rating:number,
        name:string
    }


    test('downloading recommendations', async () => {

        try {
            const url= `http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/recommend_on_user_SVD?user_id=${604}&n_recommend=${11}`
            const response = await axios.get(url);
            const lastRatings = response.data.data;

            let isValid = true;

            lastRatings.forEach((item: Movie) => {
                //Sprawdzenie formatu
                if (!Array.isArray(item) || item.length !== 2 || typeof item[0] !== 'number' || typeof item[1] !== 'string') {
                    isValid = false;
                }
            });


            expect(isValid).toBe(true);
            expect(response.status).toBe(200);
            expect(lastRatings).not.toBeNull();
            expect(lastRatings.length).toBe(11);
        } catch (error) {
            console.error('Unexpected error: ', error);
            throw error;
        }
    });

    test('downloading details about movie', async () => {

        try {
            const api_key = import.meta.env.VITE_OMDB_CLIENT_ID;
            const url = `https://www.omdbapi.com/?t=Forrest Gump&y=1994&apikey=${api_key}`
            const response = await axios.get(url);
            const data=response.data;


            let isValid = true;
            //Sprawdzenie czy format otrzymanych danych się zgadza
            isValid=(typeof data.Title === 'string' &&
                    typeof data.Year === 'string' &&
                    typeof data.Rated === 'string' &&
                    typeof data.Released === 'string' &&
                    typeof data.Runtime === 'string' &&
                    typeof data.Genre === 'string' &&
                    typeof data.Director === 'string' &&
                    typeof data.Writer === 'string' &&
                    typeof data.Actors === 'string' &&
                    typeof data.Plot === 'string' &&
                    typeof data.Language === 'string' &&
                    typeof data.Country === 'string' &&
                    typeof data.Awards === 'string' &&
                    typeof data.Poster === 'string')

            const trailerId = await fetchTrailerId(data.Title);
            expect(isValid).toBe(true);
            expect(trailerId).not.toBe(null);
            expect(typeof trailerId).toBe('string');
            expect(response.data.Response).toBe("True");
            expect(response.data.data).not.toBe(null)
        } catch (error) {
            console.error('Unexpected error: ', error);
            throw error;
        }
    });



});


