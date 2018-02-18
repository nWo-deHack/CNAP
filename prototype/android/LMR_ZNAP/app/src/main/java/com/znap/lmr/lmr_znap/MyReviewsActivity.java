package com.znap.lmr.lmr_znap;


import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class MyReviewsActivity extends AppCompatActivity {
    private Retrofit retrofit;
    private static Request request;
    List<Rate> rates;
    private int userid;
    ListView list;
    List<String> ratesOfUsers;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_my_reviews);

        getSupportActionBar().setTitle(SystemMessages.REVIEWS_TITLE);
        list = (ListView) findViewById(R.id.ReviewsList);
        Bundle bundle = getIntent().getExtras();
        if (bundle != null) {
            assert bundle != null;
            userid = bundle.getInt(SystemMessages.USER_ID);
            rates = new ArrayList<>();
            ratesOfUsers = new ArrayList<>();

            request = ZnapUtility.generateRetroRequest();

            MyReviewsActivity.getApi().getRateForUser(userid).enqueue(new Callback<List<Rate>>() {
                @Override
                public void onResponse(Call<List<Rate>> call, Response<List<Rate>> response) {
                    rates.addAll(response.body());
                    System.out.println(rates);
                    for (int i = rates.size() - 1; i > 0; i--) {
                        System.out.println(rates.get(i).getDescription());

                        try {
                            ratesOfUsers.add(AESEncryption.decrypt_string(rates.get(i).getDescription()));
                        } catch (InvalidKeyException e) {
                            e.printStackTrace();
                        } catch (NoSuchAlgorithmException e) {
                            e.printStackTrace();
                        } catch (NoSuchPaddingException e) {
                            e.printStackTrace();
                        } catch (InvalidAlgorithmParameterException e) {
                            e.printStackTrace();
                        } catch (IllegalBlockSizeException e) {
                            e.printStackTrace();
                        } catch (BadPaddingException e) {
                            e.printStackTrace();
                        } catch (ClassNotFoundException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    list.setAdapter(new ArrayAdapter<>(MyReviewsActivity.this, android.R.layout.simple_list_item_1, ratesOfUsers));
                }
                @Override
                public void onFailure(Call<List<Rate>> call, Throwable t) {
                }
            });
        } else {
            finish();
        }
    }

    public static Request getApi() {
        return request;
    }
}
