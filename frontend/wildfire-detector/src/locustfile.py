from locust import HttpUser, task, between

class MyUser(HttpUser):
    wait_time = between(1, 3)  # Time between consecutive task execution

    @task
    def call_predictWildfire(self):
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + "put_here_the_authorization_token",
            "Origin": "*"
        }
        payload = {"content": "\put_here_the_image_base_code" }
        response = self.client.post("/predictWildfire", json=payload, headers=headers)
        
        # Assuming the response is JSON, you can access the response body
        # and handle it accordingly
        data = response.json()
        # Process the response data as needed
        
        # Optional: You can print the response content or status code for debugging
        # print(response.text)
        # print(response.status_code)
